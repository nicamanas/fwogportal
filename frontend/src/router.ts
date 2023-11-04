// Generouted, changes to this file will be overriden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/`
  | `/candidatesearch`
  | `/createskill`
  | `/editlistings`
  | `/editlistings/create`
  | `/editlistings/edit/:id`
  | `/profile`
  | `/profile/addskill`
  | `/rolelistings`
  | `/rolelistings/:id`
  | `/skillcatalogue`
  | `/skillcatalogue/edit/:id`
  | `/staff/:id`
  | `/staffapplications`
  | `/template`

export type Params = {
  '/editlistings/edit/:id': { id: string }
  '/rolelistings/:id': { id: string }
  '/skillcatalogue/edit/:id': { id: string }
  '/staff/:id': { id: string }
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
