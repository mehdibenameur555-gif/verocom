import Z1Button from "@/components/z1";

export function SaveButton({ children = "Enregistrer", ...props }) {
  return <Z1Button {...props}>{children}</Z1Button>;
}
