import { useEffect, useState } from "react";
import { FancyDropdown } from "../../Components/FancyDropdown/FancyDropdown";
import { FancyInput } from "../../Components/FancyInput/FancyInput";
import { FancyTextarea } from "../../Components/FancyTextarea/FancyTextarea";
import { useStoreActions, useStoreState } from "../../hooks/typedStore";
import { getRepo } from "../../operations/githubApi";
import { InputContainer } from "./Components/InputContainer/InputContainer";
import "./Home.scss";
interface IHomeProps {}

export default function Home(props: IHomeProps) {
  const setRepoDetails = useStoreActions((actions) => actions.setRepoDetails);
  const repoData = useStoreState((state) => state.repoData);

  const [repo, setRepo] = useState("");
  const [theme, setTheme] = useState("Light");
  const [borders, setBorders] = useState("Show");
  const [description, setDescription] = useState("");

  useEffect(() => {
    (async () => {
      if (repo.split("/").length === 2 && repoData === {}) {
        try {
          const res = await getRepo(repo.split("/")[0], repo.split("/")[1]);
          console.log(res);
          setRepoDetails(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    })();
  }, [repo]);

  return (
    <div className="HomeWrapper">
      <div className="HomeWrapper__properties">
        <div className="HomeWrapper__properties--top">
          <h2>Properties</h2>
          <hr />
          <InputContainer label="Repository" isRequired htmlFor="repo">
            <FancyInput
              name="repo"
              id="repo"
              setValue={(val) => {
                setRepo(val);
              }}
              value={repo}
              placeholder="ABSanthosh/Gastly"
            />
          </InputContainer>

          <InputContainer label="Theme" htmlFor="theme">
            <FancyDropdown
              name="theme"
              id="theme"
              options={["Light", "Dark"]}
              defaultValue={theme}
              setValue={(val) => setTheme(val)}
            />
          </InputContainer>

          <InputContainer label="Borders" htmlFor="border">
            <FancyDropdown
              name="border"
              id="border"
              options={["Show", "Hide"]}
              defaultValue={borders}
              setValue={(val) => setBorders(val)}
            />
          </InputContainer>

          <InputContainer
            label="Description"
            htmlFor="description"
            isColumn
            gap="10px"
            alignItems="flex-start"
          >
            <FancyTextarea
              name="description"
              id="description"
              value={description}
              style={{ width: "100%", minWidth: "100%" }}
              setValue={(val) => setDescription(val)}
              placeholder="Description"
            />
          </InputContainer>
        </div>
        <div className="HomeWrapper__properties--bottom"></div>
      </div>
      <div className="HomeWrapper__preview"></div>
    </div>
  );
}
