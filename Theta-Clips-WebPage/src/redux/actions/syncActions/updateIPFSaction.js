export const SET_IPFS = "SET_IPFS"

export const set_ipfslink_action = (ipfslink) => {
    return {
        type: "SET_IPFS",
        payload: ipfslink
    }
}