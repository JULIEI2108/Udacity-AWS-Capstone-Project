
import { deleteItem } from "./Api/ItemApi";
import { Token } from "./Api/ItemApi";
export default function art_reducer(state, action) {
  if (action.type === "get_photos") {
    return { ...state, photos: [...action.payload] };
  }

  if (action.type === "get_personal_photos") {
    return { ...state, personalPhotos: [...action.payload] };
  }

  if (action.type === "delete_photo") {
    const { photos, personalPhotos } = state;
    const newPhotos = photos.filter((item) => item.itemId !== action.payload);
    const newPersonalPhotos = personalPhotos.filter(
      (item) => item.itemId !== action.payload
    );
    (async () => {
      const token=await Token()
      console.log('start deleting')
      await deleteItem(token,action.payload)
        .then((response) => console.log("delete successful"))
        .catch((err) => console.log("There was an error", err));
    })();

    return {
      ...state,
      photos: [...newPhotos],
      personalPhotos: [...newPersonalPhotos],
    };
  }

  return state;
}
