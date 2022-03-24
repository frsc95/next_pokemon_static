//rafc

import Image from "next/image";
import NextLink from 'next/link'
import { Spacer, Text, useTheme, Link } from "@nextui-org/react"
// import Link from "next/link";

export const Navbar = () => {

  const { theme } = useTheme();

  return (
    <div style={{
      display: 'flex',
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'start',
      padding: '0px 20px',
      backgroundColor: theme?.colors.gray900.value
    }}>

      {/*  la imagen no se sirve desde nuestra aplicacion */}
      {/* en next.config.js seteo este dominio web como confiable */}
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
        alt="icono de la app"
        width={70}
        height={70}
      />
      {/* <span>Hola</span> */}

      {/* <Text color='white' h2>P</Text>
        <Text color='white' h3>okemon</Text> */}

      <NextLink href="/" passHref>
        <Link>
          <Text color='white' h2>P</Text>
          <Text color='white' h3>okemon</Text>
        </Link>
      </NextLink>

      <Spacer css={{ flex: 1 }} />

      <NextLink href="/favorites" passHref>
        <Link css={{ marginRight: '10px' }}>
          <Text color='white'>Favoritos</Text>
        </Link>
      </NextLink>
    </div>
  )
}
