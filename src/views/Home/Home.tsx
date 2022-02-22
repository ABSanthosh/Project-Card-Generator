import { useStoreRehydrated } from "easy-peasy";
import { useEffect, useState } from "react";
import { CardWithImage } from "../../Components/CardWithImage/CardWithImage";
import { FancyCheckbox } from "../../Components/FancyCheckbox/FancyCheckbox";
import { FancyDropdown } from "../../Components/FancyDropdown/FancyDropdown";
import { FancyInput } from "../../Components/FancyInput/FancyInput";
import { FancyTextarea } from "../../Components/FancyTextarea/FancyTextarea";
import { useStoreActions, useStoreState } from "../../hooks/typedStore";
import { getRepo, isGitHubRepo } from "../../operations/githubApi";
import { InputContainer } from "./Components/InputContainer/InputContainer";
import "./Home.scss";
interface IHomeProps {}

export default function Home(props: IHomeProps) {
  const setRepoDetails = useStoreActions((actions) => actions.setRepoDetails);
  const repoData = useStoreState((state) => state.repoData);
  const storeDescription = useStoreState((state) => state.description);
  const setStoreDescription = useStoreActions(
    (actions) => actions.setDescription
  );
  const [cardSrc, setCardSrc] = useState("");

  const isRehydrated = useStoreRehydrated();

  const [repo, setRepo] = useState("");
  const [theme, setTheme] = useState("Light");
  const [borders, setBorders] = useState("Show");
  const [description, setDescription] = useState(storeDescription);

  const [fork, setFork] = useState(repoData?.forks_count);
  const [stars, setStars] = useState(repoData?.stargazers_count);
  const [issues, setIssues] = useState(repoData?.open_issues_count);
  const [language, setLanguage] = useState(repoData?.language);
  const [license, setLicense] = useState(repoData?.license?.name);

  const [showFork, setShowFork] = useState(true);
  const [showStars, setShowStars] = useState(true);
  const [showIssues, setShowIssues] = useState(true);
  const [showLicense, setShowLicense] = useState(true);
  const [showDescription, setShowDescription] = useState(true);
  const [defaultDescription, setDefaultDescription] = useState(true);
  const [withImage, setWithImage] = useState("Without Image");

  useEffect(() => {
    const owner = repo?.split("/")[0];
    const repoName = repo?.split("/")[1];
    if (owner && repoName) {
      (async () => {
        const isGitRepo = await isGitHubRepo(owner, repoName);
        if (
          isGitRepo &&
          isGitRepo.status === 200 &&
          repoData?.full_name !== owner + "/" + repoName
        ) {
          try {
            const res = await getRepo(owner, repoName);
            console.log(res);
            setRepoDetails(res.data);
            setDescription(res.data.description);
            setStoreDescription(res.data.description);
          } catch (err) {
            console.log(err);
          }
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repo]);

  useEffect(() => {
    if (isRehydrated && repoData) {
      setDescription((prev: string) => {
        setDefaultDescription(description === repoData.description);
        if (prev === "" && storeDescription !== prev && defaultDescription) {
          return storeDescription;
        }
        if (prev && storeDescription !== "" && prev !== repoData.description) {
          setStoreDescription(prev);
          return prev;
        }
        return prev;
      });
      setFork(repoData.forks_count);
      setStars(repoData.stargazers_count);
      setIssues(repoData.open_issues_count);
      setLanguage(repoData.language);
      setLicense(repoData.license);
    }
  }, [
    defaultDescription,
    description,
    isRehydrated,
    repoData,
    setStoreDescription,
    storeDescription,
  ]);

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
              setValue={(val) => setRepo(val)}
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

          <InputContainer label="Image" htmlFor="image">
            <FancyDropdown
              name="image"
              id="image"
              options={["With Image", "Without Image"]}
              defaultValue={withImage}
              setValue={(val) => setWithImage(val)}
            />
          </InputContainer>

          <InputContainer
            label="Description"
            htmlFor="description"
            isColumn
            gap="10px"
            alignItems="flex-start"
            labelChild={
              <FancyCheckbox
                name="showDescription"
                id="showDescription"
                value={showDescription}
                style={{ width: "unset" }}
                setValue={(val) => {
                  console.log(val);
                  setShowDescription(val);
                }}
              />
            }
          >
            <FancyTextarea
              name="description"
              id="description"
              disabled={!showDescription}
              value={description || ""}
              style={{ width: "100%", minWidth: "100%" }}
              setValue={(val) => setDescription(val)}
              placeholder="Description"
            />
          </InputContainer>

          <div className="HomeWrapper__properties--checkboxContainer">
            <InputContainer
              label="Default Description"
              htmlFor="defaultDescription"
              style={{ width: "fit-content", gap: "10px" }}
            >
              <FancyCheckbox
                name="defaultDescription"
                id="defaultDescription"
                value={defaultDescription}
                style={{ width: "unset" }}
                setValue={(val) => {
                  setDefaultDescription(val);
                  if (val) {
                    setDescription(repoData?.description);
                  }
                }}
              />
            </InputContainer>

            <InputContainer
              label="Stars"
              htmlFor="Star"
              style={{ width: "fit-content", gap: "10px" }}
            >
              <FancyCheckbox
                name="Star"
                id="Star"
                value={showStars}
                style={{ width: "unset" }}
                setValue={(val) => setShowStars(val)}
              />
            </InputContainer>

            <InputContainer
              label="Forks"
              htmlFor="Fork"
              style={{ width: "fit-content", gap: "10px" }}
            >
              <FancyCheckbox
                name="Fork"
                id="Fork"
                value={showFork}
                style={{ width: "unset" }}
                setValue={(val) => setShowFork(val)}
              />
            </InputContainer>

            <InputContainer
              label="Issues"
              htmlFor="Issue"
              style={{ width: "fit-content", gap: "10px" }}
            >
              <FancyCheckbox
                name="Issue"
                id="Issue"
                value={showIssues}
                style={{ width: "unset" }}
                setValue={(val) => setShowIssues(val)}
              />
            </InputContainer>

            <InputContainer
              label="Licenses"
              htmlFor="License"
              style={{ width: "fit-content", gap: "10px" }}
            >
              <FancyCheckbox
                name="License"
                id="License"
                value={showLicense}
                style={{ width: "unset" }}
                setValue={(val) => setShowLicense(val)}
              />
            </InputContainer>
          </div>
        </div>
        <div className="HomeWrapper__properties--bottom">

          
        </div>
      </div>
      <div className="HomeWrapper__preview">
        {isRehydrated && repoData && (
          <>
            <CardWithImage
              title={repo}
              description={description}
              showFork={showFork}
              showStars={showStars}
              showIssues={showIssues}
              showLicense={showLicense}
              forks={fork}
              stars={stars}
              issues={issues}
              language={language}
              license={license}
              showDescription={showDescription}
              showImage={withImage === "With Image"}
              setCardSrc={(src) => setCardSrc(src)}
              cardSrc={cardSrc}
            />
            <img src={cardSrc} alt="Card" />
          </>
        )}
      </div>
    </div>
  );
}
