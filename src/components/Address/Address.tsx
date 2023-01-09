import React, { useState, useEffect } from "react"
import { ethers } from "ethers"
import { AvatarResolver } from "@ensdomains/ens-avatar"
import { useEnsAddress, useEnsName, useProvider } from "wagmi"
import Blockies from 'react-blockies'
import { AddressPropTypes } from "./AddressPropTypes"

const Address = ({ value, scopeKey = "wagmi", children }: AddressPropTypes) => {
	const [avatar, setAvatar] = useState<string | null>()
	const provider = useProvider({ chainId: 1 })

	const isAddress = ethers.utils.isAddress(value)
	const { data: address } = isAddress ? { data: value } : useEnsAddress({ name: value, scopeKey })
	const { data: ens } = useEnsName({ address: address as `0x${string}`, scopeKey })
	const shortAddress = address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` as `0x${string}` : undefined

	const resolveAvatar = async () => {
		if (ens) {
			const avt = new AvatarResolver(provider)
			const avatarURI = await avt.getAvatar(ens, {});
			setAvatar(avatarURI);
		}
	}

	const blockie = () => {
		return (address) ? <Blockies seed={address.toLowerCase()} size={8} /> : null
	}

	useEffect(() => {
		resolveAvatar()
	}, [ens])

	// if (children) {
	// 	return (
	// 		<>
	// 			{children({ avatar, address, ens, shortAddress, blockie: blockie() })}
	// 		</>
	// 	)
	// }

	return (<div className="border border-blue-900">
		Hello User
		{avatar ? <img src={avatar} style={{ width: "1rem", height: '1rem', borderRadius: "5px" }} /> : blockie()}
		<span style={{ marginLeft: "1rem" }}>{ens || shortAddress}</span>
	</div>)
}

export default Address