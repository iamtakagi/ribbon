import { alphanumeric } from 'nanoid-dictionary'
import { customAlphabet } from 'nanoid/non-secure'

export const nanoid = customAlphabet(alphanumeric)