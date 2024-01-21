import { ImgHTMLAttributes } from 'react';
import styles from './Avatar.module.css'

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
    hasBorder?: boolean;

//? para dizer que é opcional
}

export function Avatar({hasBorder = true, ...props}: AvatarProps) {
    return (
        <img 
            className={hasBorder ? styles.avatarWithBorder : styles.avatar} 
            {...props}
        />
    )
}