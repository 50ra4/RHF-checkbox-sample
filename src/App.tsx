import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

const FRUITS = ['apple', 'banana', 'cherry', 'grape', 'orange'] as const;

type Fruit = keyof typeof FRUITS;
type Profile = {
  name: string;
  favoriteFruits: Fruit[];
};

const DEFAULT_VALUES = {
  profiles: [
    {
      name: '',
      favoriteFruits: [],
    },
  ] as Profile[],
};

function Form({
  onClickCopy,
  defaultValues,
}: {
  defaultValues?: { profiles: Profile[] };
  onClickCopy: (value: { profiles: Profile[] }) => void;
}) {
  const { control, register, getValues } = useForm({ defaultValues });
  const { fields, append } = useFieldArray({ name: 'profiles', control });

  return (
    <div>
      <form>
        {fields.map((field, i) => (
          <div key={field.id}>
            <label>
              name:
              <input {...register(`profiles.${i}.name`)} />
            </label>
            <fieldset>
              <legend>favoriteFruits:</legend>
              <div>
                {FRUITS.map((fruit) => (
                  <label key={`${i}-${fruit}`}>
                    <input
                      type="checkbox"
                      value={fruit}
                      {...register(`profiles.${i}.favoriteFruits`)}
                    />
                    {fruit}
                  </label>
                ))}
              </div>
            </fieldset>
            <button
              type="button"
              onClick={() => {
                append({ name: '', favoriteFruits: [] });
              }}
            >
              add profile
            </button>
          </div>
        ))}
      </form>
      <button type="button" onClick={() => onClickCopy(getValues())}>
        copy form
      </button>
    </div>
  );
}

export function App() {
  const [forms, setForms] = useState([DEFAULT_VALUES]);

  return (
    <div className="p-3 space-y-3">
      {forms.map((form, i) => (
        <div className="p-3 border-gray-400 border-4 border-solid" key={i}>
          <Form
            onClickCopy={(v) => {
              setForms((prev) => [...prev, v]);
            }}
            defaultValues={form}
          />
        </div>
      ))}
    </div>
  );
}
