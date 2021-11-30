export const SET_PUBKEY = "SET_PUBKEY"

export const set_pubkey_action = (pubkey) => {
    return {
        type: "SET_PUBKEY",
        payload: pubkey
    }
}
