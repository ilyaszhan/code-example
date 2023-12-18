'use client'

import gsap from "gsap"
import { GameCameraZoomSpeed } from "../../config/gameConfig"
import useModel from "../../hooks/modelHooks"
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks"
import { setCameraPosition, setCameraShot, setCameraTargetPosition, setInteractiveMode, setIsOnCamera, setLockCamera, setShowPicture, setZoom } from "../../store/gameStore"
import HoverHighlight from "../hoverHighlight/hoverHighlight"
import { setGameDefaultState } from "../../utils/game"
import { useEffect } from "react"
import { cameraLoaded } from "../../store/loadingStore"

// Компонент камеры, вы можете посмотреть как он работает по ссылке https://sweethava.me кликнув на камеру
const Camera = () => {
    // Получаем модели и материалы с GLTF файла
    const { nodes, materials } = useModel('/gltf/camera.glb')
    // Получаем стейты
    const { interactiveMode, zoomMultiplier } = useAppSelector(store => store.game)
    const dispatch = useAppDispatch()
    // Получаем аудиофайлы
    const shotAudio = new Audio('/sounds/camera.mp3')
    const gigachadAudio = new Audio('/sounds/gigachad.mp3')

    // Колбек при клике на камеру
    const onOpen = () => {
        if (!interactiveMode) {
            dispatch(setIsOnCamera(true))
            dispatch(setLockCamera(true))
            dispatch(setZoom(1000 * zoomMultiplier))
            dispatch(setCameraTargetPosition([-0.02, 3.367, -1.747]))
            dispatch(setCameraPosition([-0.296, 3.5, 3]))
            dispatch(setInteractiveMode(true))

            setTimeout(() => {
                playShot()
            }, 1000 * GameCameraZoomSpeed)
        }
    }

    // Колбек для закрытия интерактивного режима с камерой
    const closeCamera = () => {
        setGameDefaultState(dispatch)
    }

    // Колбек при снимке
    const playShot = () => {
        shotAudio.play()
        dispatch(setCameraShot(true))

        setTimeout(() => {
            dispatch(setShowPicture(true))

            gigachadAudio.volume = 0.5
            gigachadAudio.play()
            gsap.to(gigachadAudio, {
                volume: 0,
                ease: 'power4.in',
                duration: 5,
                onComplete: () => {
                    gigachadAudio.currentTime = 0
                    gigachadAudio.pause()
                }
            })

            setTimeout(() => {
                closeCamera()
            }, 4000)
        }, 1000)
    }

    // Действия при загрузке компонента
    useEffect(() => {
        shotAudio.load()
        gigachadAudio.load()
        dispatch(cameraLoaded())
    }, [])

    return (
        <group dispose={null}>
            {/* Компонент отвечающий за выделение объекта при наведении */}
            <HoverHighlight
                disabled={interactiveMode}
                onClick={onOpen}
            >
                {/* Расположение объектов из GLTF файла */}
                <group position={[-0.02, 3.465, -1.747]}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Cube022.geometry}
                        material={materials.Aluminum}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Cube022_1.geometry}
                        material={materials.DarkPlastic}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Cube022_2.geometry}
                        material={materials.Screen}
                    />
                </group>
            </HoverHighlight>
        </group>
    );
}

export default Camera