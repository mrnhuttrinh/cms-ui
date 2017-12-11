import React from 'react';
import {createUltimatePagination, ITEM_TYPES} from 'react-ultimate-pagination';
import FlatButton from 'material-ui/FlatButton';
import NavigationFirstPage from 'material-ui/svg-icons/navigation/first-page';
import NavigationLastPage from 'material-ui/svg-icons/navigation/last-page';
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import { translate } from 'react-i18next';

const flatButtonStyle = {
  minWidth: 36
};

const Page = ({value, isActive, onClick}) => (
  <FlatButton style={flatButtonStyle} label={value.toString()} primary={isActive} onClick={onClick}/>
);

const Ellipsis = ({onClick}) => (
  <FlatButton style={flatButtonStyle} label="..." onClick={onClick}/>
);

const FirstPageLink = translate('translations')(({isActive, onClick, t}) => (
  <FlatButton labelPosition="after" label={t('FIRST')} style={flatButtonStyle} icon={<NavigationFirstPage/>} onClick={onClick}/>
));

const PreviousPageLink = translate('translations')(({isActive, onClick, t}) => (
  <FlatButton labelPosition="after" label={t('PRVE')} style={flatButtonStyle} icon={<NavigationChevronLeft/>} onClick={onClick}/>
));

const NextPageLink = translate('translations')(({isActive, onClick, t}) => (
  <FlatButton labelPosition="before" label={t('NEXT')} style={flatButtonStyle} icon={<NavigationChevronRight/>} onClick={onClick}/>
));

const LastPageLink = translate('translations')(({isActive, onClick, t}) => (
  <FlatButton labelPosition="before" label={t('LAST')} style={flatButtonStyle} icon={<NavigationLastPage/>} onClick={onClick}/>
));

const itemTypeToComponent = {
  [ITEM_TYPES.PAGE]: Page,
  [ITEM_TYPES.ELLIPSIS]: Ellipsis,
  [ITEM_TYPES.FIRST_PAGE_LINK]: FirstPageLink,
  [ITEM_TYPES.PREVIOUS_PAGE_LINK]: PreviousPageLink,
  [ITEM_TYPES.NEXT_PAGE_LINK]: NextPageLink,
  [ITEM_TYPES.LAST_PAGE_LINK]: LastPageLink
};

const UltimatePaginationMaterialUi = createUltimatePagination({
  itemTypeToComponent,
});

export default UltimatePaginationMaterialUi;
