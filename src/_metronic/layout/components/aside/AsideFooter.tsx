// import {KTIcon, toAbsoluteUrl} from '../../../helpers'
// import {HeaderNotificationsMenu, HeaderUserMenu, QuickLinks} from '../../../partials'
import {HeaderUserMenu} from '../../../partials'
import {toAbsoluteUrl} from '../../../helpers'

import { useTranslation } from 'react-i18next'; 


const AsideFooter = () => {

  const { i18n } = useTranslation();

  const handleLanguageSwitch = () => {
    const newLanguage = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLanguage);
  };


  return (
    <div
      className='aside-footer d-flex flex-column align-items-center flex-column-auto'
      id='kt_aside_footer'
    >
      {/* begin::Quick links */}
      {/* <div className='d-flex align-items-center mb-2'>
        <div
          className='btn btn-icon btn-active-color-primary btn-color-gray-500 btn-active-light'
          data-kt-menu-trigger='click'
          data-kt-menu-overflow='true'
          data-kt-menu-placement='top-start'
          data-bs-toggle='tooltip'
          data-bs-placement='right'
          data-bs-dismiss='click'
          title='Quick links'
        >
          <KTIcon iconName='element-plus' className='fs-2 text-lg-1' />
        </div>
        <QuickLinks backgroundUrl='media/misc/pattern-1.jpg' />
      </div> */}
      {/* end::Quick links */}

      {/* begin::Activities */}
      {/* <div className='d-flex align-items-center mb-3'>
        <div
          className='btn btn-icon btn-active-color-primary btn-color-gray-500 btn-active-light'
          data-kt-menu-trigger='click'
          data-kt-menu-overflow='true'
          data-kt-menu-placement='top-start'
          data-bs-toggle='tooltip'
          data-bs-placement='right'
          data-bs-dismiss='click'
          title='Activity Logs'
          id='kt_activities_toggle'
        >
          <KTIcon iconName='chart-simple' className='fs-2 text-lg-1' />
        </div>
      </div> */}
      {/* end::Activities */}

      {/* begin::Notifications */}
      <div className='d-flex align-items-center mb-2'>
                <button onClick={handleLanguageSwitch}>
                  {i18n.language === 'ar' ? 'العربية' : 'English'}
                </button>
      </div>
      {/* end::Notifications */}

      {/* begin::User */}
      <div className='d-flex align-items-center mb-10' id='kt_header_user_menu_toggle'>
        {/* begin::Menu wrapper */}
        <div
          className='cursor-pointer symbol symbol-40px'
          data-kt-menu-trigger='click'
          data-kt-menu-overflow='false'
          data-kt-menu-placement='top-start'
          title='User profile'
        >
          <img src={toAbsoluteUrl('media/avatars/300-1.jpg')} alt='avatar' />
        </div>
        {/* end::Menu wrapper */}
        <HeaderUserMenu />
      </div>
      {/* end::User */}
    </div>
  )
}

export {AsideFooter}
