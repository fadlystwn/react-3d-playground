"use client"
import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Sphere } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'

export default function Stars(props: any) {
    const ref = useRef<any>()
    const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }))
    
    // Add fallen stars state
    const [fallenStars, setFallenStars] = useState(() => {
      return Array.from({ length: 50 }, () => ({
        position: [Math.random() * 4 - 2, Math.random() * 2, Math.random() * 2 - 1], // Random starting position
        velocity: [0, -Math.random() * 0.01 - 0.01, 0], // Falling speed
        opacity: 1.0 // Start fully opaque
      }))
    })

    useFrame((state, delta) => {
      // Rotate the static stars
      ref.current.rotation.x -= delta / 10
      ref.current.rotation.y -= delta / 15

      // Update fallen stars
      setFallenStars(prevFallenStars =>
        prevFallenStars.map(star => {
          const [x, y, z] = star.position
          const [vx, vy, vz] = star.velocity

          // Update position and fade out
          const newY = y + vy
          const newOpacity = Math.max(star.opacity - delta * 0.5, 0) // Fade out

          return {
            ...star,
            position: [x + vx * delta, newY, z + vz * delta],
            opacity: newOpacity
          }
        }).filter(star => star.opacity > 0) // Remove stars that are fully faded
      )
    })

    return (
      <group rotation={[0, 0, Math.PI / 4]}>
        {/* Static stars */}
        <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
          <PointMaterial transparent color="#ffa0e0" size={0.005} sizeAttenuation={true} depthWrite={false} />
        </Points>

        {/* Fallen stars */}
        {fallenStars.map((star, index) => (
          <Sphere key={index} args={[0.01, 16, 16]} position={star.position}>
            <meshBasicMaterial
              transparent
              opacity={star.opacity}
              color="#fffacd" // Slightly different color for fallen stars
            />
          </Sphere>
        ))}
      </group>
    )
}
