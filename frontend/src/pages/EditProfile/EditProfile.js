import './EditProfile.css'
import { uploads } from '../../utils/config'

// Hooks
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Redux
import { profile, resetMessage } from '../../slices/userSlice'

// Componets
import Message from '../../components/Message'

const EditProfile = () => {
  const dispacth = useDispatch()

  const { user, message, error, loading } = useSelector(state => state.user)

  // states
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')
  const [password, setPassword] = useState('')
  const [profileImage, setProfileImage] = useState('')
  const [previewImage, setPreviewImage] = useState('')

  // Load user data
  useEffect(() => {
    dispacth(profile())
  }, [dispacth])

  // Fill from withh user data
  useEffect(() => {
    if (user) {
      setName(user.name)
      setBio(user.bio)
      setEmail(user.email)
    }
  }, [user])

  const handleSubmit = e => {
    e.preventDefault()
  }

  const handleFile = e => {
    // image preview
    const image = e.target.files[0]

    setPreviewImage(image)

    // update image state
    setProfileImage(image)
  }

  return (
    <div id="edit-profile">
      <h2>Edite seus dados</h2>
      <p className="subtitle">
        Adicione uma imagem de perfil e conte mais sobre você
      </p>
      {(user.profileImage || previewImage) && (
        <img
          className="profile-image"
          src={
            previewImage
              ? URL.createObjectURL(previewImage)
              : `${uploads}/users/${user.profile}`
          }
          alt={user.name}
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          onChange={e => setName(e.target.value)}
          value={name || ''}
        />
        <input type="email" placeholder="E-mail" disabled value={email || ''} />
        <label>
          <span>Imagem do Perfil:</span>
          <input type="file" onChange={handleFile} />
        </label>

        <label>
          <span>Bio:</span>
          <input
            type="text"
            placeholder="Descrição do Perfl"
            onChange={e => setBio(e.target.value)}
            value={bio || ''}
          />
        </label>

        <label>
          <span>Quer alterar sua senha?</span>
          <input
            type="password"
            placeholder="Digite sua nova senha"
            onChange={e => setPassword(e.target.value)}
            value={password || ''}
          />
        </label>
        <input type="submit" value="Atualizar" />
      </form>
    </div>
  )
}

export default EditProfile
