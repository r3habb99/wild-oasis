import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');
  if (error) {
    throw new Error(`Cabins could not be loaded ${error.message}`);
  }
  return data;
}

// export async function createEditCabin(newCabin, id) {
//   const hasImagePath = newCabin.image?.startWith?.(supabaseUrl);
//   const imageName = `${new Date().toISOString()}-${
//     newCabin.image.name
//   }`.replaceAll('/', '');
//   const imagePath = hasImagePath
//     ? newCabin.image
//     : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
//   // 1. Create/Edit Cabin
//   let query = supabase.from('cabins');

//   // A) Create
//   if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

//   // B) Edit
//   if (id)
//     query = query
//       .update({ ...newCabin, image: imagePath })
//       .eq('id', id)
//       .select();

//   const { data, error } = await query.select().single();

//   if (error) {
//     console.log(error);
//     throw new Error('Cabins could not be created');
//   }

//   // 2. Upload Image
//   if (hasImagePath && newCabin.image) return data;
//   const { error: storageError } = await supabase.storage
//     .from('cabin-images')
//     .upload(imageName, newCabin.image);

//   // 3. Delete the cabin if there was an error uploading image
//   if (storageError) {
//     await supabase.from('cabins').delete().eq('id', data.id);
//     console.log(storageError);
//     throw new Error(
//       'Cabins image could not be uploaded and the cabin was not created'
//     );
//   }
//   return data;
// }
export async function createEditCabin(newCabin, id) {
  const hasImagePath =
    typeof newCabin.image === 'string' &&
    newCabin.image.startsWith(supabaseUrl);
  const imageName =
    !hasImagePath && newCabin.image
      ? `${new Date().toISOString()}-${newCabin.image.name}`.replaceAll('/', '')
      : '';
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/Edit Cabin
  let query = supabase.from('cabins');

  // A) Create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) Edit
  if (id) {
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq('id', id)
      .select();
  }

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error(`Cabins could not be created or edited ${error.message}`);
  }

  // 2. Upload Image if it's a new file
  if (!hasImagePath && newCabin.image) {
    const { error: storageError } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, newCabin.image);

    // 3. Delete the cabin if there was an error uploading image
    if (storageError) {
      await supabase.from('cabins').delete().eq('id', data.id);
      throw new Error(
        `Cabins image could not be uploaded and the cabin was not created ${error.message}`
      );
    }
  }

  return data;
}


export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);
  if (error) {
    throw new Error(`Cabin could not be deleted ${error.message}`);
  }
  return data;
}
