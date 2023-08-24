import supabase from "./supabase";
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not found");
  }
  return data;
}
export async function deleteCabin(id) {
  console.log(id);
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabins could deleted");
  }
}
export async function createEditCabin(newCabin, id) {
  // check image is already setted
  const hasImage = newCabin?.image?.startsWith?.(
    import.meta.env.VITE_SUPABASE_URL
  );
  console.log(newCabin);
  const imageName = `${crypto.randomUUID()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImage
    ? newCabin.image
    : `${
        import.meta.env.VITE_SUPABASE_URL
      }/storage/v1/object/public/cabin-images/${imageName}`;
  let query = supabase.from("cabins");

  // create if this not edit session
  if (!id) query = query.insert({ ...newCabin, image: imagePath });
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins could deleted");
  }
  if (hasImage) return data;
  const { error: uploadError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // remove cabin if image could not upload
  if (uploadError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(
      "Cabins image could not be uploaded and cabin was not created"
    );
  }
  return data;
}
//editlerken disable et
