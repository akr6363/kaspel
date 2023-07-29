import React from 'react';
import {UsersTable} from "./components/table/table";
import {AddUserForm} from "./components/form/form";
import { Button, Form, Input,  DatePicker} from 'antd';
const App = () => {
    return (
        <div className={'app'}>
            <div className={'container'}>
                <UsersTable/>
                <AddUserForm/>
            </div>
        </div>
    );
};

export default App;