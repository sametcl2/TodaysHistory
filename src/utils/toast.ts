import { ToastType } from 'constants/toast'
import store from 'store'
import { showToast } from 'store/toast'

type CreateToastType = {
  title: string
  subTitle: string
  show: boolean
  type: ToastType
}

export const handleCreateToast = ({ title, subTitle, show, type }: CreateToastType) => {
  store.dispatch(showToast({ title, subTitle, show, type }))
}
