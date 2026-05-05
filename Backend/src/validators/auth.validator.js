const { z } = require("zod");

exports.signupSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits").optional(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    role: z.enum(["DOCTOR", "PATIENT"], {
      required_error: "Role is required",
      invalid_type_error: "Role must be DOCTOR or PATIENT",
    }),
  }),
});

exports.loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
  }),
});

exports.googleAuthSchema = z.object({
  body: z.object({
    token: z.string({
      required_error: "Google token is required",
    }),
    role: z.enum(["DOCTOR", "PATIENT"], {
      invalid_type_error: "Role must be DOCTOR or PATIENT",
    }).optional(),
  }),
});
