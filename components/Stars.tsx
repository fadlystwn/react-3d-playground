"use client"
import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'
import * as THREE from 'three'

export default function Stars(props: any) {
    const ref = useRef<any>()
    const pointLightRef = useRef<THREE.PointLight>(null)
    const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }))

    useFrame((state, delta) => {
        // Rotate the stars
        if (ref.current) {
            ref.current.rotation.x -= delta / 10
            ref.current.rotation.y -= delta / 15
        }

        // Add pulsing effect to the light
        if (pointLightRef.current) {
            pointLightRef.current.intensity = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.5
        }
    })

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            {/* Static stars */}
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#ffa0e0"
                    size={0.005}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>

            {/* Add a glowing light effect */}
            <pointLight
                ref={pointLightRef}
                position={[0, 0, 0]}
                color="#ffffff"
                intensity={1}
                distance={10}
                decay={2}
            />
        </group>
    )
}
