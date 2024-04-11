import { useUI } from "$store/sdk/useUI.ts";
import Button from "$store/components/ui/Button.tsx";

export default function AddToCartButtonModalLente(){

    const { displayModal } = useUI();

    const onClick = () => {
        displayModal.value = true;
    };

    return (
        <div>
            <Button
                class="btn no-animation btn-primary w-full"
                onClick={onClick}
            >
                Adicionar à  Sacola
            </Button>
        </div>
    );

}