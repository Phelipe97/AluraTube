import react from "react";
import { StyledRegisterVideo } from "./styles";
import { createClient } from "@supabase/supabase-js";

function useForm(propsDoForm) {
    const [values, setValues] = react.useState(propsDoForm.initialValues);
    return {
        values,
        handleChange: (evento) => {
            const value = evento.target.value;
            const name = evento.target.name;
            setValues({
                ...values,
                [name]: value,
            });

        },
        clearForm () {
            setValues({});
        }
    };
}

const PROJECT_URL ="https://qwkqffrkbyhvqmzedxna.supabase.co";
const PUBLIC_KEY ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3a3FmZnJrYnlodnFtemVkeG5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxOTU3MTcsImV4cCI6MTk4Mzc3MTcxN30.OfYF1mshmizAEWNaa0ma9PgYXCZ8qPUpYSo5mn5G3bA";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);


export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: { titulo: "", url: "" }
    });
    const [formVisivel, setFormVisivel] = react.useState(false);


    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            {formVisivel
                ? (
                    <form onSubmit={(evento) => {
                        evento.preventDefault();
                        supabase.from("video").insert({
                            title:formCadastro.values.titulo,
                            url:formCadastro.values.url,
                            thumb:"",
                            playlist: "jogos",
                         })
                         .then((oqueveio) => {
                            console.log(oqueveio);
                         })
                         .catch((err) => {
                            console.log(err);
                         })
                        setFormVisivel(false);
                        formCadastro.clearForm();
                    }}>
                        <div>
                            <button type="button"className="close-modal" onClick={() => setFormVisivel(false)}>
                                x
                            </button>
                            <input
                                placeholder="Titulo do video"
                                name="titulo"
                                value={formCadastro.values.titulo}
                                onChange={formCadastro.handleChange}
                            />
                            <input
                                placeholder="Url"
                                name="url"
                                value={formCadastro.values.url}
                                onChange={formCadastro.handleChange}
                            />
                            <button type="submit">
                                Cadastrar
                            </button>
                        </div>
                    </form>
                )
                : false}
        </StyledRegisterVideo>
    )
}