import { Fragment } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import AppInput from '@/components/common/AppInput';
import DefaultButton from '@/components/common/buttons/DefaultButton';
import { required, minLength } from '@/utils';

function ResetPassword() {
  // For form
  const methods = useForm();
  const { setError } = methods;

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Fragment>
      <div className="rounded px-8 pb-8">
        <h4 className="mb-4 text-center font-semibold">Update password</h4>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {/* Password */}
            <div className="mt-1">
              <AppInput
                label="New password"
                type="password"
                placeholder="Enter new password"
                id="password"
                name="Password"
                validator={[required, minLength(6)]}
              />
            </div>

            {/* Confirm password */}
            <div className="mt-1">
              <AppInput
                label="Confirm password"
                type="password"
                placeholder="Enter confirm password"
                id="confirmPassword"
                name="Confirm password"
                validator={[required]}
              />
            </div>

            {/* Submit button */}
            <DefaultButton
              type="submit"
              className="w-full !rounded-lg font-semibold"
              hoverColor="primary.contrastText">
              Confirm
            </DefaultButton>
          </form>
        </FormProvider>
      </div>
    </Fragment>
  );
}

export default ResetPassword;
