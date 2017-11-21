// in posts.js
import React from 'react';
import { List, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, ShowButton, DisabledInput, TextInput, LongTextInput, DateInput } from 'admin-on-rest';
import FontIcon from 'material-ui/FontIcon';

export const AccountList = (props) => (
    <List title="Danh sách tài khoản ví" {...props}>
        <Datagrid>
            <TextField source="id" label="STK"/>
            <TextField source="accountName" label="TÊN TÀI KHOẢN"/>
            <TextField source="accountType.description" label="LOẠI"/>
            <TextField source="unknow1" label="KHÁCH HÀNG"/>
            <TextField source="unknow2" label="HẠNG VÍ"/>
            <DateField source="dateOpened" label="NGÀY MỞ"/>
            <TextField source="status" label="TRẠNG THÁI"/>
            <ShowButton />
            <EditButton basePath="/posts" />
        </Datagrid>
    </List>
);

const AccountTitle = ({ record }) => {
    return <span>Tài Khoản {record ? `"${record.id}"` : ''}</span>;
};

export const EditAccount = (props) => {
  return (
    <Edit title={<AccountTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="title" />
            <TextInput source="teaser" options={{ multiLine: true }} />
            <LongTextInput source="body" />
            <DateInput label="Publication date" source="published_at" />
            <TextInput source="average_note" />
            <DisabledInput label="Nb views" source="views" />
        </SimpleForm>
    </Edit>
)};
