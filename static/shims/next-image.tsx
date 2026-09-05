'use client';

import type { ComponentProps } from 'react';

/** next/image 垫片：直接输出原生 img。 */
export function Image(props: ComponentProps<'img'>) {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <img {...(props as object)} />;
}

export default Image;
