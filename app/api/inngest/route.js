import { serve } from "inngest/next";
import {
  createUser,
  updateUserData,
  deleteUser,
  inngest,
  createUserOrder,
} from "../../../config/inngest";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [createUser, updateUserData, deleteUser],
});
