import { Button, Form, Input, notification } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import React from 'react';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../utils/constants';
import { rutValidator } from '../../../utils/formValidator';
import './LoginForm.scss';
import { handleApiError, handleApiResponse } from 'utils/handlers';
import { postToApi } from 'api/axios';

// const signInUser = async (data, isFinish) =>
//   handleApiResponse(
//     postToApi,
//     `/user/sign-in`,
//     data,
//     'Error del servidor: No ha enviado respuesta.',
//     isFinish
//   );

function LoginForm() {
  const [form] = useForm();
  const finishForm = async () => {
    const values = form.getFieldsValue();
    try {
      const loginResponse = await postToApi('/user/sign-in', values);
      const { data } = loginResponse;
      // form.resetFields();
      const { accessToken, refreshToken } = data;
      if (!accessToken || !refreshToken) {
        throw new Error(
          'Error del servidor, no se han enviado las credenciales de sesión'
        );
      }
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);

      window.location.href = '/';
    } catch (error) {
      if (error?.response) {
        notification.error({
          message: error?.response?.data?.message || 'Error desconocido',
        });
      } else {
        handleApiError(error);
      }
    }
  };

  return (
    <Form form={form} className="login-form form" onFinish={finishForm}>
      <Form.Item
        name="rut"
        rules={[
          { required: true, message: 'Debe ingresar su rut' },
          {
            validator: (_, value) =>
              rutValidator(value)
                ? Promise.resolve()
                : Promise.reject(new Error('El rut ingresado no es válido')),
          },
          {
            max: 12,
            min: 0,
            message: 'Este campo no puede tener más de 12 caracteres',
          },
        ]}
      >
        <Input placeholder="Rut" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: 'Debe ingresar su contraseña' },
          {
            max: 40,
            min: 0,
            message: 'Este campo no puede tener más de 45 caracteres',
          },
        ]}
      >
        <Input.Password placeholder="Contraseña" />
      </Form.Item>
      <FormItem className="mt-3">
        <Button htmlType="submit" type="primary" block className="text-base">
          Ingresar
        </Button>
      </FormItem>
    </Form>
  );
}

export default LoginForm;
