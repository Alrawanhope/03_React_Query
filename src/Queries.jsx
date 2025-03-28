import { supabase, supabaseUrl } from "./Supabase";

export async function getProfileAPI() {
  let { data, error } = await supabase.from("profile").select("*");

  if (error) {
    throw new Error("Unable to fetch data");
  }

  return data;
}

export async function addProfileAPI(newProfile) {
  const imageUrl = `${Math.random()}_${newProfile.imageUrl[0].name.replaceAll(
    "/",
    ""
  )}`;

  const imagePath = `${supabaseUrl}/storage/v1/object/public/image//${imageUrl}`;

  let { data, error } = await supabase
    .from("profile")
    .insert([{ ...newProfile, imageUrl: imagePath }])
    .select();

  if (error) {
    throw new Error("Unable to add data");
  }

  const { error: storageError } = await supabase.storage
    .from("image")
    .upload(imageUrl, newProfile.imageUrl[0]);

  if (storageError) {
    throw new Error("Unable to storageError data");
  }

  return data;
}

export async function deleteProfileAPI(id) {
  const { error, data } = await supabase.from("profile").delete().eq("id", id);

  if (error) {
    throw new Error("Unable to delete data");
  }

  return data;
}
