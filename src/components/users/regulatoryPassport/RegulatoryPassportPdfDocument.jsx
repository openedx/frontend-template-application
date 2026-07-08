/* eslint-disable react/prop-types */
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import { hasDisplayValue } from '../../../utils/hasDisplayValue';
import { getUserInitials } from '../../../utils/userInitials';

/** Insert break opportunities after hyphens so long passport IDs wrap in PDF. */
const formatPassportIdForPdf = (value) => String(value).replace(/-/g, '-\u200B');

const styles = StyleSheet.create({
  page: {
    paddingBottom: 32,
    fontSize: 10,
    color: '#1F2937',
    fontFamily: 'Helvetica',
  },
  header: {
    backgroundColor: '#2A3B8F',
    color: '#FFFFFF',
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 16,
  },
  headerLeft: {
    width: 120,
  },
  logo: {
    height: 36,
    width: 'auto',
    objectFit: 'contain',
  },
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    objectFit: 'cover',
  },
  avatarFallback: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    color: '#2A3B8F',
    fontSize: 14,
    fontWeight: 700,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 14,
  },
  name: {
    fontSize: 18,
    fontWeight: 700,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subText: {
    fontSize: 10,
    color: '#E2E8F0',
    marginBottom: 2,
  },
  headerRight: {
    width: 140,
    flexShrink: 0,
    alignItems: 'flex-end',
  },
  passportIdValue: {
    width: 140,
    fontSize: 11,
    fontWeight: 700,
    lineHeight: 1.35,
    color: '#FFFFFF',
    textAlign: 'right',
  },
  passportIdLabel: {
    fontSize: 8,
    color: '#CBD5E1',
    marginTop: 4,
    textAlign: 'right',
  },
  section: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  aboutSection: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#F3F4F6',
    flexDirection: 'row',
    gap: 24,
  },
  aboutLeft: {
    flex: 2,
  },
  aboutRight: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: '#1F2937',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  bodyText: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#374151',
  },
  metaLabel: {
    fontSize: 8,
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  metaValue: {
    fontSize: 11,
    fontWeight: 600,
    color: '#1F2937',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  statCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FFFFFF',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 700,
    color: '#2A3B8F',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 8,
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  domainItem: {
    marginBottom: 12,
  },
  domainRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  domainName: {
    fontSize: 10,
    fontWeight: 600,
    color: '#1F2937',
    flex: 1,
    paddingRight: 8,
  },
  domainPercent: {
    fontSize: 10,
    fontWeight: 700,
    color: '#2A3B8F',
  },
  progressTrack: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: 6,
    backgroundColor: '#2A3B8F',
    borderRadius: 3,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  tag: {
    fontSize: 8,
    color: '#475569',
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  table: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 6,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  thTraining: {
    width: '24%', fontSize: 8, fontWeight: 700, color: '#64748B',
  },
  thProvider: {
    width: '16%', fontSize: 8, fontWeight: 700, color: '#64748B',
  },
  thCompleted: {
    width: '14%', fontSize: 8, fontWeight: 700, color: '#64748B',
  },
  thActivities: {
    width: '24%', fontSize: 8, fontWeight: 700, color: '#64748B',
  },
  thRemoteType: {
    width: '12%', fontSize: 8, fontWeight: 700, color: '#64748B',
  },
  thCertificate: {
    width: '10%', fontSize: 8, fontWeight: 700, color: '#64748B',
  },
  tdTraining: {
    width: '24%', fontSize: 8, color: '#1F2937', fontWeight: 600,
  },
  tdProvider: {
    width: '16%', fontSize: 8, color: '#64748B',
  },
  tdCompleted: {
    width: '14%', fontSize: 8, color: '#64748B',
  },
  tdActivities: {
    width: '24%', fontSize: 8, color: '#2A3B8F',
  },
  tdRemoteType: {
    width: '12%', fontSize: 8, color: '#1F2937',
  },
  tdCertificate: {
    width: '10%', fontSize: 8, color: '#2A3B8F',
  },
  emptyText: {
    fontSize: 10,
    color: '#64748B',
    fontStyle: 'italic',
  },
});

const RegulatoryPassportPdfDocument = ({
  detail,
  labels,
  logoSrc,
  profileImageSrc,
  domainCoverage = [],
  completedTrainings = [],
}) => {
  const visibleStats = (detail.stats ?? []).filter(
    (item) => hasDisplayValue(item?.id) && hasDisplayValue(item?.number),
  );
  const visibleDomains = domainCoverage.filter((item) => hasDisplayValue(item?.domain));
  const visibleTrainings = completedTrainings.filter((row) => hasDisplayValue(row?.id));
  const initials = getUserInitials(detail.name);

  return (
    <Document title={`Regulatory Passport — ${detail.name}`}>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {logoSrc && <Image src={logoSrc} style={styles.logo} />}
          </View>

          <View style={styles.headerCenter}>
            {profileImageSrc ? (
              <Image src={profileImageSrc} style={styles.avatar} />
            ) : (
              hasDisplayValue(initials) && (
                <Text style={styles.avatarFallback}>{initials}</Text>
              )
            )}
            <View>
              {hasDisplayValue(detail.name) && (
                <Text style={styles.name}>{detail.name}</Text>
              )}
              {hasDisplayValue(detail.jobTitle) && (
                <Text style={styles.subText}>{detail.jobTitle}</Text>
              )}
              {hasDisplayValue(detail.organisationLine) && (
                <Text style={styles.subText}>{detail.organisationLine}</Text>
              )}
            </View>
          </View>

          {hasDisplayValue(detail.passportId) && (
            <View style={styles.headerRight}>
              <Text style={styles.passportIdValue}>
                {formatPassportIdForPdf(detail.passportId)}
              </Text>
              <Text style={styles.passportIdLabel}>{labels.passportIdLabel}</Text>
            </View>
          )}
        </View>

        <View style={styles.aboutSection}>
          <View style={styles.aboutLeft}>
            <Text style={styles.sectionTitle}>{labels.aboutTitle}</Text>
            {hasDisplayValue(detail.about) ? (
              <Text style={styles.bodyText}>{detail.about}</Text>
            ) : null}
          </View>
          {hasDisplayValue(detail.competencyRole) && (
            <View style={styles.aboutRight}>
              <Text style={styles.metaLabel}>{labels.competencyRoleLabel}</Text>
              <Text style={styles.metaValue}>{detail.competencyRole}</Text>
            </View>
          )}
        </View>

        {visibleStats.length > 0 && (
          <View style={styles.statsRow}>
            {visibleStats.map((item) => (
              <View key={item.id} style={styles.statCard}>
                <Text style={styles.statValue}>{item.number}</Text>
                {hasDisplayValue(item.name) && (
                  <Text style={styles.statLabel}>{item.name}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{labels.domainCoverageTitle}</Text>
          {visibleDomains.length === 0 ? (
            <Text style={styles.emptyText}>{labels.domainCoverageEmpty}</Text>
          ) : (
            visibleDomains.map((item) => (
              <View key={item.id} style={styles.domainItem}>
                <View style={styles.domainRow}>
                  <Text style={styles.domainName}>{item.domain}</Text>
                  <Text style={styles.domainPercent}>{item.percent}%</Text>
                </View>
                <View style={styles.progressTrack}>
                  <View style={[styles.progressFill, { width: `${Math.min(item.percent, 100)}%` }]} />
                </View>
                {item.tags?.length > 0 && (
                  <View style={styles.tagsRow}>
                    {item.tags.map((tag) => (
                      <Text key={tag} style={styles.tag}>{tag}</Text>
                    ))}
                  </View>
                )}
              </View>
            ))
          )}
        </View>

        {visibleTrainings.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{labels.completedTrainingTitle}</Text>
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={styles.thTraining}>{labels.tableTraining}</Text>
                <Text style={styles.thProvider}>{labels.tableProvider}</Text>
                <Text style={styles.thCompleted}>{labels.tableCompleted}</Text>
                <Text style={styles.thActivities}>{labels.tableActivities}</Text>
                <Text style={styles.thRemoteType}>{labels.tableRemoteType}</Text>
                <Text style={styles.thCertificate}>{labels.tableCertificate}</Text>
              </View>
              {visibleTrainings.map((row) => (
                <View key={row.id} style={styles.tableRow} wrap={false}>
                  <Text style={styles.tdTraining}>{row.training}</Text>
                  <Text style={styles.tdProvider}>
                    {hasDisplayValue(row.provider) ? row.provider : ''}
                  </Text>
                  <Text style={styles.tdCompleted}>
                    {hasDisplayValue(row.completed) ? row.completed : ''}
                  </Text>
                  <Text style={styles.tdActivities}>
                    {hasDisplayValue(row.activity) ? row.activity : ''}
                  </Text>
                  <Text style={styles.tdRemoteType}>
                    {hasDisplayValue(row.remoteType) ? row.remoteType : ''}
                  </Text>
                  <Text style={styles.tdCertificate}>
                    {hasDisplayValue(row.certificateViewUrl) ? labels.certificateView : ''}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default RegulatoryPassportPdfDocument;
