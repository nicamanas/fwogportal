declare module '../../../../components/EditRoleListingForm' {
  import { RoleListing } from '../../../../types/RoleListing';

  export interface EditRoleListingFormProps {
    roleListing: RoleListing;
  }

  export default function EditRoleListingForm(props: EditRoleListingFormProps): JSX.Element;
}