import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { SchemaPost } from './post.schema'
import axios from 'axios'
import type { SchemaPostType, RegistrationResult } from './post.types'
import { REGISTRATION_STATUS_MESSAGES } from './post.messages'


export const usePostModel = () => {
  const [alert, setAlert] = useState<RegistrationResult | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SchemaPostType>({
    resolver: zodResolver(SchemaPost),
  })

  const { mutate } = useMutation<string, AxiosError, SchemaPostType>({
    mutationFn: async (data) => {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts/1', data)
      return response.data
    },
    onError: () => {
      setAlert(REGISTRATION_STATUS_MESSAGES.error)
    },
    onSuccess: () => {
      setAlert(REGISTRATION_STATUS_MESSAGES.success)

    },
  })

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    alert,
    mutate
  }
}