import Image from 'next/image'
import { useTranslation } from 'react-i18next'

import type { FollowListProfile } from '../..'
import { useCart } from '#/contexts/cart-context'
import MainnetBlack from 'public/assets/mainnet-black.svg'
import { extractAddressAndTag, isTagListOp } from '#/utils/list-ops'

interface SocialFollowButtonProps {
  profiles: FollowListProfile[]
}

const SocialFollowButton: React.FC<SocialFollowButtonProps> = ({ profiles }) => {
  const { t } = useTranslation()
  const { cartItems, setCartItems } = useCart()

  const removeCarItems = async () => {
    const address = profiles?.[0]?.address
    if (!address) return []

    const addresses = profiles.map(({ address }) => address.toLowerCase())

    const filteredCartItems = cartItems.filter(item =>
      isTagListOp(item.listOp)
        ? !addresses.includes(extractAddressAndTag(item.listOp).address.toLowerCase())
        : !addresses.includes(`0x${item.listOp.data.toString('hex')}`.toLowerCase())
    )

    setCartItems(filteredCartItems)

    // const chunkSize = 100 // Adjust the chunk size as needed
    // for (let i = 0; i < profiles.length; i += chunkSize) {
    //   const chunk = profiles.slice(i, i + chunkSize)
    //   await Promise.all(
    //     chunk.map(({ address }) => {
    //       const tagsFromCart = getTagsFromCartByAddress(address)
    //       removeCartItem(listOpAddListRecord(address))
    //       tagsFromCart.map(tag => removeCartItem(listOpAddTag(address, tag)))
    //     })
    //   )
    //   await yieldToMain() // Yield to the main thread after processing each chunk
    // }
  }

  return (
    <button
      onClick={() => removeCarItems()}
      className='btn-following-pending text-darkGrey hover:bg-none hover:bg-[#D0D0D0] transition-all hover:scale-[1.15] after:absolute after:h-4 after:w-4 after:rounded-full after:-top-2 after:-right-2 after:bg-green-400 rounded-xl relative text-sm flex items-center gap-1.5 justify-center font-bold h-[40px] px-2'
    >
      <Image alt='mainnet logo' src={MainnetBlack} width={16} />
      {t('following')}
    </button>
  )
}

export default SocialFollowButton
