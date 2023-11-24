import request, { CommonListResponse, IListWorkspaceResponse, IPage, IWorkspaceResponse } from '@/api/http/request'
// import request2 from '/@/api/http/request2'

// const HTTP_PREFIX = '/manage/api/v1'

// login
export interface LoginBody {
 username: string,
 password: string,
 flag: number,
}
export interface BindBody {
  device_sn: string,
  user_id: string,
  workspace_id: string,
  domain?: string
}
export interface HmsQueryBody {
  sns: string[],
  children_sn: string,
  device_sn: string,
  language: string,
  level: number | string,
  begin_time: number,
  end_time: number,
  message: string,
  domain: string,
}

export const login = async function (body: {}): Promise<IWorkspaceResponse<any>> {
  const url = '/sys/api/v1/auth/login'
  const result = await request.post(url, body)
  return result.data
}

export const register = async function (body: {}): Promise<IWorkspaceResponse<any>> {
  const url = '/user/api/v1/register'
  const result = await request.post(url, body)
  return result.data
}

export const resetPassword = async function (body: {}): Promise<IWorkspaceResponse<any>> {
  const url = '/user/api/v1/reset'
  const result = await request.post(url, body)
  return result.data
}

export const manUserInfo = async function (): Promise<IWorkspaceResponse<any>> {
  const url = '/sys/api/v1/auth/info'
  const result = await request.get(url)
  return result.data
}

// 获取页面权限
export const permissionsList = async function (roleId:any): Promise<IWorkspaceResponse<any>> {
  const url = `/sys/api/v1/menu/permissions/${roleId}`
  const result = await request.get(url)
  return result.data
}

export const logout = async function (): Promise<IWorkspaceResponse<any>> {
  const url = '/sys/api/v1/auth/logout'
  const result = await request.post(url)
  return result.data
}

// 根据组织标识获取组织菜单
export const menuOrg = async function (orgId:any): Promise<IWorkspaceResponse<any>> {
  const url = `/sys/api/v1/menu/org/${orgId}`
  const result = await request.get(url)
  return result.data
}

// 校验账号是否存在
export const checkExistence = async (params:any): Promise<IWorkspaceResponse<any>> => {
  const url = '/user/api/v1/checkExistence'
  const result = await request.get(url, { params })
  return result.data
}

// 用户组织列表
export const myOrganizationsList = async function (): Promise<IWorkspaceResponse<any>> {
  const url = '/organize/api/v1/manageOrganize/myOrganizations'
  const result = await request.get(url)
  return result.data
}

// 运维接口------------------------------------------------------------------------------------

// 基础信息和默认参数查询
export const systemInfo = async function (): Promise<IWorkspaceResponse<any>> {
  const url = '/manage/api/v1/systemInfo'
  const result = await request2.get(url)
  return result.data
}

// 政策
export const richText = async function (camelName:any): Promise<IWorkspaceResponse<any>> {
  const url = `/manage/api/v1/richText/q/${camelName}`
  const result = await request2.get(url)
  return result.data
}

// 字典
export const secondTree = async function (): Promise<IWorkspaceResponse<any>> {
  const url = '/sys/api/v1/sys/dataDicts/secondTree'
  const result = await request2.get(url)
  return result.data
}

// export const login = (data: {}): Promise<IWorkspaceResponse<any>> => {
//   // console.log('data',data)
//   return request({
//     // url: '/login',
//     url: '/sys/api/v1/auth/login',
//     method: 'post',
//     data
//   })
// }

// Refresh Token
// export const refreshToken = async function (body: {}): Promise<IWorkspaceResponse<any>> {
//   const url = `${HTTP_PREFIX}/token/refresh`
//   const result = await request.post(url, body)
//   return result.data
// }

// // Get Platform Info
// export const getPlatformInfo = async function (): Promise<IWorkspaceResponse<any>> {
//   const url = `${HTTP_PREFIX}/workspaces/current`
//   const result = await request.get(url)
//   return result.data
// }

// // Get User Info
// export const getUserInfo = async function (): Promise<IWorkspaceResponse<any>> {
//   const url = `${HTTP_PREFIX}/users/current`
//   const result = await request.get(url)
//   return result.data
// }

// // Get Device Topo
// export const getDeviceTopo = async function (workspace_id: string): Promise<IWorkspaceResponse<any>> {
//   const url = `${HTTP_PREFIX}/devices/${workspace_id}/devices`
//   const result = await request.get(url)
//   return result.data
// }

// // Get Livestream Capacity
// export const getLiveCapacity = async function (body: {}): Promise<IWorkspaceResponse<any>> {
//   const url = `${HTTP_PREFIX}/live/capacity`
//   const result = await request.get(url, body)
//   return result.data
// }

// // Start Livestream
// export const startLivestream = async function (body: {}): Promise<IWorkspaceResponse<any>> {
//   const url = `${HTTP_PREFIX}/live/streams/start`
//   const result = await request.post(url, body)
//   return result.data
// }

// // Stop Livestream
// export const stopLivestream = async function (body: {}): Promise<IWorkspaceResponse<any>> {
//   const url = `${HTTP_PREFIX}/live/streams/stop`
//   const result = await request.post(url, body)
//   return result.data
// }
// // Update Quality
// export const setLivestreamQuality = async function (body: {}): Promise<IWorkspaceResponse<any>> {
//   const url = `${HTTP_PREFIX}/live/streams/update`
//   const result = await request.post(url, body)
//   return result.data
// }

// export const getAllUsersInfo = async function (wid: string, body: IPage): Promise<CommonListResponse<any>> {
//   const url = `${HTTP_PREFIX}/users/${wid}/users?&page=${body.page}&page_size=${body.page_size}`
//   const result = await request.get(url)
//   return result.data
// }

// export const updateUserInfo = async function (wid: string, user_id: string, body: {}): Promise<IWorkspaceResponse<any>> {
//   const url = `${HTTP_PREFIX}/users/${wid}/users/${user_id}`
//   const result = await request.put(url, body)
//   return result.data
// }

// export const bindDevice = async function (body: BindBody): Promise<IWorkspaceResponse<any>> {
//   const url = `${HTTP_PREFIX}/devices/${body.device_sn}/binding`
//   const result = await request.post(url, body)
//   return result.data
// }

// export const unbindDevice = async function (device_sn: string): Promise<IWorkspaceResponse<any>> {
//   const url = `${HTTP_PREFIX}/devices/${device_sn}/unbinding`
//   const result = await request.delete(url)
//   return result.data
// }

// export const getDeviceBySn = async function (workspace_id: string, device_sn: string): Promise<IWorkspaceResponse<any>> {
//   const url = `${HTTP_PREFIX}/devices/${workspace_id}/devices/${device_sn}`
//   const result = await request.get(url)
//   return result.data
// }

// export const getBindingDevices = async function (workspace_id: string, body: IPage, domain: string): Promise<IWorkspaceResponse<any>> {
//   const url = `${HTTP_PREFIX}/devices/${workspace_id}/devices/bound?&page=${body.page}&page_size=${body.page_size}&domain=${domain}`
//   const result = await request.get(url)
//   return result.data
// }

// export const updateDevice = async function (body: {}, workspace_id: string, device_sn: string): Promise<IWorkspaceResponse<any>> {
//   const url = `${HTTP_PREFIX}/devices/${workspace_id}/devices/${device_sn}`
//   const result = await request.put(url, body)
//   return result.data
// }

// export const getUnreadDeviceHms = async function (workspace_id: string, device_sn: string): Promise<IWorkspaceResponse<any>> {
//   const url = `${HTTP_PREFIX}/devices/${workspace_id}/devices/hms/${device_sn}`
//   const result = await request.get(url)
//   return result.data
// }

// export const updateDeviceHms = async function (workspace_id: string, device_sn: string): Promise<IWorkspaceResponse<any>> {
//   const url = `${HTTP_PREFIX}/devices/${workspace_id}/devices/hms/${device_sn}`
//   const result = await request.put(url)
//   return result.data
// }

// export const getDeviceHms = async function (body: HmsQueryBody, workspace_id: string, pagination: IPage): Promise<IListWorkspaceResponse<any>> {
//   let url = `${HTTP_PREFIX}/devices/${workspace_id}/devices/hms?page=${pagination.page}&pageSize=${pagination.page_size}` +
//     `&level=${body.level ?? ''}&beginTime=${body.begin_time ?? ''}&endTime=${body.end_time ?? ''}&message=${body.message ?? ''}&language=${body.language}`
//   body.sns.forEach((sn: string) => {
//     if (sn !== '') {
//       url = url.concat(`&deviceSn=${sn}`)
//     }
//   })
//   const result = await request.get(url)
//   return result.data
// }
