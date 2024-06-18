'use client'
import { Link, Spacer } from '@nextui-org/react';
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations();

  return (
    <div className='flex flex-col sm:flex-row items-center justify-center text-[#B0B0B0] text-xs'>
      <div>©️Copyleft 2024 {t('Footer.nuwaLabs')}</div>
      <Spacer x={4} />
      <div>{t('Footer.protocol')}：AGPL V3</div>
      <Spacer x={4} />
      <Link
        target='_blank'
        href='https://github.com/NuwaLabs/nuwa-web'
        className='text-[#B0B0B0] text-xs'
      >{t('Footer.codeAddress')}：nuwa.github.com</Link>
    </div>
  )
}
