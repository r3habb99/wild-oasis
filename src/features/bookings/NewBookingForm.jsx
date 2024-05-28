/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
//Note: I really hope Jonas sees my code. It worked and I'm very proud of it
import toast from 'react-hot-toast';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { differenceInDays, isBefore, isDate, startOfToday } from 'date-fns';

// Ui imports
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import Checkbox from '../../ui/Checkbox';
import Button from '../../ui/Button';

import { useCabins } from '../cabins/useCabins-hook';
import { useSettings } from '../settings/useSettings-hook';
import { useGuests } from '../../hooks/useGuests';
import { useCreateBooking } from './useCreateBooking-hook';

const StyledSelect = styled.select`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
`;

function NewBookingForm({ onCloseModal }) {
  const [wantsBreakfast, setWantsBreakfast] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const { cabins, isLoading } = useCabins();
  const { guests, isLoading: isLoadingGuests } = useGuests();
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const { createBooking, isLoading: isCreating } = useCreateBooking();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  if (isLoading || isLoadingSettings || isLoadingGuests) return <Spinner />;
  function onSubmit(data) {
    const numNights = differenceInDays(
      new Date(data.endDate),
      new Date(data.startDate)
    );
    const today = startOfToday();
    //Filtering dates
    if (numNights < 1) {
      toast.error('Start date must be before end date');
      return;
    }
    if (numNights < settings.minBookingLength) {
      toast.error(
        `Minimum nights per booking are ${settings.minBookingLength}`
      );
      return;
    }
    if (numNights > settings.maxBookingLength) {
      toast.error(
        `Maximum nights per booking are ${settings.maxBookingLength}`
      );
      return;
    }
    if (isBefore(new Date(data.startDate), today)) {
      toast.error("You can't start a booking before today");
      return;
    }
    //cabinPrice
    const reservedCabin = cabins
      .filter((cabin) => cabin.id === Number(data.cabinId))
      .at(0);
    const cabinPrice =
      (reservedCabin.regularPrice - reservedCabin.discount) * numNights;

    //extrasPrice
    const extrasPrice = wantsBreakfast
      ? settings.breakfastPrice * numNights * data.numGuests
      : 0;
    //totalPrice
    const totalPrice = cabinPrice + extrasPrice;
    const finalData = {
      ...data,
      cabinPrice,
      extrasPrice,
      totalPrice,
      isPaid,
      numNights,
      cabinId: Number(data.cabinId),
      numGuests: Number(data.numGuests),
      guestId: Number(data.guestId),
      hasBreakfast: wantsBreakfast,
      status: 'unconfirmed',
      startDate: new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString(),
    };
    createBooking(finalData, {
      onSuccess: (data) => {
        navigate(`/bookings`);
        reset();
        onCloseModal?.();
      },
    });
  }
  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow
        label="Start date"
        error={errors?.startDate?.message}
      >
        <Input
          disabled={isCreating}
          type="date"
          id="startDate"
          {...register('startDate', {
            required: 'This field is required',
            validate:
              isDate(getValues().startDate) || 'You must choose a valid date',
          })}
        />
      </FormRow>
      <FormRow
        label="End date"
        error={errors?.endDate?.message}
      >
        <Input
          disabled={isCreating}
          type="date"
          id="endDate"
          {...register('endDate', {
            required: 'This field is required',
            validate:
              isDate(getValues().endDate) || 'You must choose a valid date',
          })}
        />
      </FormRow>
      <FormRow
        label="Number of guests"
        error={errors?.numGuests?.message}
      >
        <Input
          disabled={isCreating}
          type="number"
          min={1}
          defaultValue={1}
          id="numGuests"
          {...register('numGuests', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Minimum number of guests must be 1',
            },
            max: {
              value: settings.maxGuestsPerBooking,
              message: `Max number of guests must be ${settings.maxGuestsPerBooking}`,
            },
          })}
        />
      </FormRow>
      <FormRow label="Select cabin">
        <StyledSelect
          disabled={isCreating}
          id="cabinId"
          {...register('cabinId')}
        >
          {cabins.map((cabin) => (
            <option
              key={cabin.id}
              value={cabin.id}
            >
              {cabin.name}
            </option>
          ))}
        </StyledSelect>
      </FormRow>
      <FormRow label="Select guest">
        <StyledSelect
          disabled={isCreating}
          id="guestId"
          {...register('guestId')}
        >
          {guests.map((guest) => (
            <option
              key={guest.id}
              value={guest.id}
            >
              {guest.fullName}
            </option>
          ))}
        </StyledSelect>
      </FormRow>
      <FormRow label="Further observations">
        <Input
          type="text"
          id="observations"
          disabled={isCreating}
          {...register('observations')}
        />
      </FormRow>
      <FormRow>
        <Checkbox
          id="breakfast"
          onChange={() => setWantsBreakfast((e) => !e)}
          disabled={isCreating}
        >
          I want breakfast with my booking
        </Checkbox>
      </FormRow>
      <FormRow>
        <Checkbox
          id="paid"
          onChange={() => setIsPaid((e) => !e)}
          disabled={isCreating}
        >
          This booking is paid
        </Checkbox>
      </FormRow>
      <FormRow>
        <Button
          size="medium"
          variation="primary"
          disabled={isCreating}
        >
          Submit
        </Button>
        <Button
          size="medium"
          variation="danger"
          onClick={() => onCloseModal?.()}
          disabled={isCreating}
        >
          Cancel
        </Button>
      </FormRow>
    </Form>
  );
}

export default NewBookingForm;
