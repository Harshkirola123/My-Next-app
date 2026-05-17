import { InferType } from "yup";
import { loginSchema } from "@/validation/auth.validation";

export type LoginFormData = InferType<typeof loginSchema>;
