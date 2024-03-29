import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ActivtityDetailHeader from "./ActivtityDetailHeader";
import ActivtityDetailedInfo from "./ActivtityDetailedInfo";
import ActivtityDetailedChat from "./ActivtityDetailedChat";
import ActivtityDetailedSidebar from "./ActivtityDetailedSidebar";

interface DetailsParams {
  id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DetailsParams>> = ({
  match,
  history
}) => {
  const activityStore = useContext(ActivityStore);
  const { activity, loadActivity, loadingInitial } = activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity, match.params.id, history]);

  if (loadingInitial) return <LoadingComponent content='Loading Activity...' />;
  if (!activity) return <h1>Activity not found</h1>;
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivtityDetailHeader activity={activity} />
        <ActivtityDetailedInfo activity={activity} />
        <ActivtityDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivtityDetailedSidebar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDetails);
