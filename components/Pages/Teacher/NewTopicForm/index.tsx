import { Formik, Form } from 'formik';
import React from 'react';
import TextInput from '../../../TextInput';
import * as Yup from 'yup';

interface NewTopicFormProps {
  onSubmit?: (data: typeof formDefaultValues) => void;
}

const formDefaultValues = { name: '' };

const NewTopicForm = ({ onSubmit }: NewTopicFormProps) => {
  const Schema = Yup.object().shape({
    name: Yup.string().required('Campo obrigatório'),
  });

  return (
    <div className='w-96'>
      <Formik
        initialValues={formDefaultValues}
        onSubmit={async (data) => {
          try {
            onSubmit && onSubmit(data);
          } catch (error) {
            console.log(error);
          }
        }}
        validationSchema={Schema}
      >
        {({ isSubmitting, handleSubmit, errors }) => {
          return (
            <Form
              action=''
              className='flex flex-col w-full'
              onSubmit={handleSubmit}
            >
              <TextInput
                id='name'
                label='Nome'
                type='text'
                error={errors.name}
              />

              <div className='flex w-full justify-center mt-4'>
                <button
                  className='py-2 w-1/2 rounded-md bg-primary text-white'
                  type='submit'
                  disabled={isSubmitting}
                >
                  Confirmar
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default NewTopicForm;
