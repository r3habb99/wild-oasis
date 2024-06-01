import { handleError } from '../utils/errorHandler';
import { isValidImage } from '../utils/imageValidation';
import supabase, { supabaseUrl } from './supabase';


export async function createEditCabin(newCabin, id) {
  const hasImagePath = typeof newCabin.image === 'string' && newCabin.image.startsWith(supabaseUrl);
  const imageName = !hasImagePath && newCabin.image
    ? `${new Date().toISOString()}-${newCabin.image.name}`.replaceAll('/', '')
    : '';
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // Retrieve old cabin data if editing
  let oldImagePath = null;
  if (id) {
    const { data: oldCabin, error: oldCabinError } = await supabase
      .from('cabins')
      .select('image')
      .eq('id', id)
      .single();
    handleError(oldCabinError, 'Retrieve old cabin data');
    oldImagePath = oldCabin?.image;
  }

  // Validate the image file format
  if (!isValidImage(newCabin.image)) {
    // Delete the cabin entry if the image is invalid and we were creating a new cabin
    if (!id) {
      throw new Error('Invalid image file format. Only JPEG, PNG, and JPG are supported.');
    }
    // For editing, just throw an error and return without further processing
    throw new Error('Invalid image file format. Only JPEG, PNG, and JPG are supported.');
  }

  // Create/Edit Cabin
  let query = supabase.from('cabins');

  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  } else {
    query = query.update({ ...newCabin, image: imagePath }).eq('id', id).select();
  }

  const { data, error } = await query.single();
  handleError(error, id ? 'Edit cabin' : 'Create cabin');

  // Upload Image if it's a new file
  if (!hasImagePath && newCabin.image) {
    const { error: storageError } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, newCabin.image);

    // Delete the cabin if there was an error uploading image
    if (storageError) {
      await supabase.from('cabins').delete().eq('id', data.id);
      handleError(storageError, 'Upload cabin image');
    }

    // Delete the old image if there was a new image uploaded
    if (oldImagePath) {
      const oldImageName = oldImagePath.split('/').pop();
      const { error: deleteOldImageError } = await supabase.storage
        .from('cabin-images')
        .remove([oldImageName]);

      handleError(deleteOldImageError, 'Delete old cabin image');
    }
  }

  return data;
}

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');
  handleError(error, 'Load cabins');
  return data;
}

export async function deleteCabin(id) {
  // Retrieve cabin data to get image path
  const { data: cabin, error: cabinError } = await supabase
    .from('cabins')
    .select('image')
    .eq('id', id)
    .single();
  handleError(cabinError, 'Retrieve cabin data');

  const { data, error } = await supabase.from('cabins').delete().eq('id', id);
  handleError(error, 'Delete cabin');

  // Delete the cabin image from storage
  if (cabin?.image) {
    const imageName = cabin.image.split('/').pop();
    const { error: deleteImageError } = await supabase.storage
      .from('cabin-images')
      .remove([imageName]);

    handleError(deleteImageError, 'Delete cabin image');
  }

  return data;
}
