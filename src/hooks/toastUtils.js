import { toast } from "react-toastify";

export const notifyAdded = () => toast.success("Added to your wishlist!");
export const notifyRemoved = () => toast.info("Removed from your wishlist.");
export const notifyExists = () => toast.warn("This item is already in your wishlist.");
export const notifyLoginRequired = () => toast.error("Please log in to perform this action.");
export const notifyFormError = () => toast.warn("Please enter a valid title.");
