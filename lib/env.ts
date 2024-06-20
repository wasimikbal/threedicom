export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-06-05';

export const NEXT_PUBLIC_STRIPE_SECRET_KEY = 'sk_test_51PQ1sjEkeq4Lo3yy3I39bsRZEI9iWltmVWxRy2dYEViDfgfPqBFgWqllxpXztPl4fUlnUO2sQGDe9aX4z2a3FdNH00Zjfr056e'

export const NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = 'pk_test_51PQ1sjEkeq4Lo3yyQXtQL79iUH0jdgBIvnVQ14cxfeOfosSuO0zPXDWvFM8lB8mzjP9bgedmdeot5sFttpqn7NvF00JUD1XYC6'

export const dataset = assertValue(
  "production",
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  "eexp1vol",
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const useCdn = false

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
