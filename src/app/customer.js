import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import { List, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, ShowButton, DisabledInput, TextInput, LongTextInput, DateInput, Show, SimpleShowLayout, RichTextField } from 'admin-on-rest';
import CustomerView from '../components/customer';

export const CustomerList = (props) => (
    <List title="Danh sách khách hàng" {...props}>
        <Datagrid>
            <TextField source="firstName" label="TÊN"/>
            <TextField source="lastName" label="HỌ"/>
            <TextField source="scmsMemberCode" label="Mã SV/GV"/>
            <TextField source="title" label="KHOA | PHÒNG BAN"/>
            <TextField source="position" label="CHỨC VỤ"/>
            <DateField source="dateBecameCustomer" label="NGÀY KHỞI TẠO"/>
            <TextField source="status" label="TRẠNG THÁI"/>
            <ShowButton />
            <EditButton basePath="/posts" />
        </Datagrid>
    </List>
);

const CustomerTitle = ({ record }) => {
    return <span>Tài Khoản {record ? `"${record.id}"` : ''}</span>;
};

const CustomerShowTitle = () => {
  return <span>Chi Tiết Khách Hàng</span>
}

export const CustomerShow = (props) => {
  return (<Show title={<CustomerShowTitle />} {...props}>
    <SimpleShowLayout>
          <CustomerView {...props} />
       </SimpleShowLayout>
    </Show>);
}

export const EditCustomer = (props) => {
  return (
    <Edit title={<CustomerTitle />} {...props}>
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
