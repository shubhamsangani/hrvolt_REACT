
import {useIntl} from 'react-intl'
import {AsideMenuItem} from './AsideMenuItem'

export function AsideMenuMainHrvolt() {
  const intl = useIntl()

  return (
    <>
      <AsideMenuItem
        to='/dashboard'
        icon='color-swatch'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
      />

      {/* <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Company</span>
        </div>
      </div>

      <AsideMenuItem
        to='/hrvolt/jd/company-details'
        icon='element-plus'
        title='Company Details'
        fontIcon='bi-layers'
      /> */}

      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Job Description</span>
        </div>
      </div>
      
      {/* <AsideMenuItem
        to='/hrvolt/jd/auto-job-description'
        icon='shield-tick'
        title='Auto Job Post'
        fontIcon='bi-layers'
      /> */}
      <AsideMenuItem
        to='/hrvolt/jd/job-description'
        icon='shield-tick'
        title='Job Post'
        fontIcon='bi-layers'
      />

      <AsideMenuItem
        to='/hrvolt/jd/view-job-description-details'
        icon='message-text-2'
        title='View Job Posts'
        fontIcon='bi-layers'
      />

      {/* <AsideMenuItem
        to='/hrvolt/jd/candidate-list-details'
        icon='profile-circle'
        title='View Candidates'
        fontIcon='bi-layers'
      /> */}

      {/* <AsideMenuItem
        to='/hrvolt/jd/bulk-resumes'
        icon='cross-circle'
        title='Bulk Resumes'
        fontIcon='bi-layers'
      /> */}

      <AsideMenuItem
        to='/hrvolt/jd/new-bulk-resumes'
        icon='cross-circle'
        title='Bulk Resumes'
        fontIcon='bi-layers'
      />

      <AsideMenuItem
        to='/hrvolt/jd/candidates-resumes'
        icon='cross-circle'
        title='Candidates Resumes'
        fontIcon='bi-layers'
      />


      {/* <AsideMenuItem
        to='/hrvolt/jd/job-post-details'
        icon='cross-circle'
        title='Job Post Details'
        fontIcon='bi-layers'
      /> */}

      {/* <AsideMenuItem
        to='/hrvolt/jd/comparision-report'
        icon='element-plus'
        title='Comparision Report'
        fontIcon='bi-layers'
      /> */}


    </>
  )
}
