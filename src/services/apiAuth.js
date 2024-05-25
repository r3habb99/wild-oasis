import supabase, { supabaseUrl } from './supabase';

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: '',
      },
    },
  });
  if (error) {
    throw new Error(`Sign Up Failed ${error.message}`);
  }
  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error(`Login Failed ${error.message}`);
  }
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw new Error(error.message);
  }
  return data?.user;
}
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(`Get Current User Failed to Fetch ${error.message}`);
  }
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };
  // 1. Update password or fullName
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) {
    throw new Error(`Current user failed to update ${error.message}`);
  }
  if (!avatar) return data;
  // 2. Upload the avatar image
  const fileName = `avatar=${data.user.id}-${new Date().toISOString()}`;
  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar);
  if (storageError) {
    throw new Error(
      `Current user avatar upload failed ${storageError.message}`
    );
  }
  // 3. Upload avatar in the user
  const { data: updatedUser, error: updatedError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });
  if (updatedError) {
    throw new Error(
      `Current user updation failed with avatar ${updatedError.message}`
    );
  }
  return updatedUser;
}
