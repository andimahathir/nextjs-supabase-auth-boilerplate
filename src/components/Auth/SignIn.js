'use client';

import { useState } from 'react';
import cn from 'classnames';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { useAuth, VIEWS } from 'src/components/AuthProvider';
import supabase from 'src/lib/supabase-browser';

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const SignIn = () => {
  const { setView } = useAuth();
  const [errorMsg, setErrorMsg] = useState(null);

  async function signIn(formData) {
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setErrorMsg(error.message);
    }
  }

  return (
    <main className="mx-auto w-full max-w-md p-6">
      <div className="mt-7 rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Welcome back, Peasant!{' '}
            </h1>
          </div>
          <div className="mt-5">
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={SignInSchema}
              onSubmit={signIn}
            >
              {({ errors, touched }) => (
                <Form className="column w-full">
                  <div className="grid gap-y-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm dark:text-white"
                      >
                        Email address
                      </label>
                      <div className="relative">
                        <Field
                          className={cn(
                            'required aria-describedby="email-error" block w-full rounded-md border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400',
                            errors.email && touched.email && 'bg-red-50'
                          )}
                          id="email"
                          name="email"
                          placeholder="jane@acme.com"
                          type="email"
                        />
                        {errors.email && touched.email ? (
                          <div className="text-red-600">{errors.email}</div>
                        ) : null}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="password"
                          className="mb-2 block text-sm dark:text-white"
                        >
                          Password
                        </label>
                      </div>
                      <div className="relative">
                        <Field
                          className={cn(
                            'dark:text-gray-400" required aria-describedby="password-error" block w-full rounded-md border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800',
                            errors.password && touched.password && 'bg-red-50'
                          )}
                          id="password"
                          name="password"
                          type="password"
                        />
                        {errors.password && touched.password ? (
                          <div className="text-red-600">{errors.password}</div>
                        ) : null}
                      </div>
                    </div>
                    <button
                      className="mt-2 inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                      type="submit"
                    >
                      Sign In
                    </button>{' '}
                  </div>
                </Form>
              )}
            </Formik>
            {errorMsg && <div className="text-red-600">{errorMsg}</div>}
            <button
              className="link mt-2 w-full"
              type="button"
              onClick={() => setView(VIEWS.SIGN_UP)}
            >
              Are you deadwood? Sign up here.
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
