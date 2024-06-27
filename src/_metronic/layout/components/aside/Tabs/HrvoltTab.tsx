import {useEffect} from 'react'
import {
  DrawerComponent,
  MenuComponent,
  ScrollComponent,
  ToggleComponent,
} from '../../../../assets/ts/components'

import {AsideMenuMainHrvolt} from '../AsideMenuMainHrvolt'

const HrvoltTab = () => {
  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
      DrawerComponent.reinitialization()
      ToggleComponent.reinitialization()
      ScrollComponent.reinitialization()
    }, 50)
     
  }, [])
  return (
    <div
      className='menu menu-column menu-fit menu-rounded menu-title-gray-600 menu-icon-gray-500 menu-state-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500 fw-bold fs-5 px-6 my-5 my-lg-0'
      id='kt_aside_menu'
      data-kt-menu='true'
    >
      <div id='kt_aside_menu_wrapper' className='menu-fit'>
        <AsideMenuMainHrvolt />
      </div>
    </div>
  )
}

export {HrvoltTab}
