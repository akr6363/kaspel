import React from "react";
import {FormikHelpers, useFormik} from "formik";
import {useAppDispatch} from "../../common/hooks";
import {usersActions, UserType} from "../../model/users/users-slice";
import {Button, Form, Input, DatePicker} from 'antd';
import dayjs from 'dayjs';

type AddUserFormErrorsType = {
    name: string;
    date: Date;
};

export type UserType2 = {
    date: Date | null
    name: string
};
export const AddUserForm = () => {
    const dispatch = useAppDispatch();

    const formik = useFormik({
        validate: (values) => {
            let errors = {} as AddUserFormErrorsType;
            if (!values.name) {
                errors.name = "Email is required";
            }
            if (values.name.length < 3) {
                errors.name = "Name can be less than 3 symbols";
            }
            return errors;
        },
        initialValues: {
            name: "",
            date: null,
        } as UserType2,
        onSubmit: (values, formikHelpers: FormikHelpers<UserType2>) => {
            console.log(values)
            const user = {
                name: values.name,
                date: values.date!.toISOString()
            }
            dispatch(usersActions.addUser({user}))
            formik.resetForm()

        },
    });

    return (
        <Form onFinish={formik.handleSubmit}>

            <Input {...formik.getFieldProps("name")} />

            {(formik.touched.name && formik.errors.name)
                ? <div>{formik.errors.name}</div>
                : null}

            <DatePicker
                {...formik.getFieldProps('date')}
                value={formik.values.date ? dayjs(formik.values.date) : null}
                onChange={(date) => formik.setFieldValue('date', date?.toDate())}
            />

            {/*{(formik.touched.date && formik.errors.date)*/}
            {/*    ? <div>{formik.errors.date}</div>*/}
            {/*    : null}*/}
            <Button type="primary" htmlType="submit">
                Add
            </Button>
        </Form>
    );
};