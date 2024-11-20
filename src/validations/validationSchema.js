import {object, string, ref} from "yup"
export const validationSchema = object({
    confirmPassword:
        string()
        .required("La contraseña no puede estar vacía")
        .oneOf([ref('password'),null],"Las contraseñas deben coincidir"),
    password:
        string()
        .required("La contraseña no puede estar vacía")
        .min(6,"La contraseña debe tener como mínimo 6 caracteres"),
    email:
        string()
        .required("El email no puede estar vacío")
        .email("Por favor, introduce un email válido")
})