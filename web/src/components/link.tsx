/**
 * Link component integrated with React Router
 */

import * as Headless from '@headlessui/react'
import React, { forwardRef } from 'react'
import { Link as RouterLink } from 'react-router-dom'

export const Link = forwardRef(function Link(
  props: { href: string } & React.ComponentPropsWithoutRef<'a'>,
  ref: React.ForwardedRef<HTMLAnchorElement>
) {
  // Use React Router's Link for internal navigation
  const isExternal = props.href.startsWith('http') || props.href.startsWith('//')

  if (isExternal) {
    return (
      <Headless.DataInteractive>
        <a {...props} ref={ref} target="_blank" rel="noopener noreferrer" />
      </Headless.DataInteractive>
    )
  }

  return (
    <Headless.DataInteractive>
      <RouterLink to={props.href} ref={ref} {...props} />
    </Headless.DataInteractive>
  )
})
