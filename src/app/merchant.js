import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import { List, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, DisabledInput, TextInput, LongTextInput, DateInput } from 'admin-on-rest';

export const MerchantList = (props) => (
    <List title="Danh sách đại lý" {...props}>
        <Datagrid>
            <TextField source="firstName" label="TÊN"/>
            <TextField source="lastName" label="HỌ"/>
            <TextField source="scmsMemberCode" label="Mã SV/GV"/>
            <TextField source="title" label="KHOA | PHÒNG BAN"/>
            <TextField source="position" label="CHỨC VỤ"/>
            <DateField source="dateBecameMerchant" label="NGÀY KHỞI TẠO"/>
            <TextField source="status" label="TRẠNG THÁI"/>
            <EditButton basePath="/posts" />
        </Datagrid>
    </List>
);

const MerchantTitle = ({ record }) => {
    return <span>Tài Khoản {record ? `"${record.id}"` : ''}</span>;
};

export const EditMerchant = (props) => {
  return (
    <Edit title={<MerchantTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="firstName" />
            <TextInput source="title" />
            <TextInput source="teaser" options={{ multiLine: true }} />
            <LongTextInput source="body" />
            <DateInput label="Publication date" source="published_at" />
            <TextInput source="average_note" />
            <DisabledInput label="Nb views" source="views" />
        </SimpleForm>
    </Edit>
)};
