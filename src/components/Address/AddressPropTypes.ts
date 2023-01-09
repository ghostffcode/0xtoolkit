import { ReactElement, ReactNode } from 'react'

export interface AddressPropTypes {
  value: string | `0x${string}`
  scopeKey?: string
  children?: (props: AddressRenderPropTypes) => ReactNode
}

export type AddressRenderPropTypes = {
  address?: `0x${string}` | null
  shortAddress?: `0x${string}`
  avatar?: string | null
  blockie?: ReactElement | null
  ens?: string | null
}
