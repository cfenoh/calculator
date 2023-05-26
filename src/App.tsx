import React, { Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { provinces } from "./taxByProvinces";
import { serviceList } from "./serviceList";
import TipForm from "./features/TipForm/TipForm";
import { Container, List, ListInlineItem } from "reactstrap";
import { useTranslation } from "react-i18next";
import { LangSelector } from "./components/LangSelector/LangSelector";

function App() {
  const { t } = useTranslation("default");
  return (
    <Suspense fallback="loading">
      <div className="App max-width-450 margin-auto">
        <TipForm provinces={provinces} services={serviceList} />
        <Container
          className={
            "d-flex flex-row justify-content-between align-items-center align-content-center border-2 px-4 border-2"
          }
        >
          <List className={"m-0 p-0 w-100"}>
            <ListInlineItem>
              <a
                href={"https://tally.so/r/n07EQB"}
                title={"buy me a coffee"}
                className={"text-decoration-none text-secondary fs-7"}
                target={"_blank"}
                rel="noreferrer"
              >
                {t("footer.contact-me")}
              </a>
            </ListInlineItem>
            <ListInlineItem>
              <div className="vr fs-7" />
            </ListInlineItem>
            <ListInlineItem>
              <a
                href={"https://www.buymeacoffee.com/fenhomenal"}
                title={"buy me a coffee"}
                className={"mr-2 text-decoration-none text-success fs-7"}
                target={"_blank"}
                rel="noreferrer"
              >
                {t("footer.buy-me-a-coffee")}
              </a>
            </ListInlineItem>
          </List>
          <LangSelector />
        </Container>
      </div>
    </Suspense>
  );
}

export default App;
